// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract ContributorEquity is ERC20, Ownable, ReentrancyGuard, Pausable {
    struct Contributor {
        address wallet;
        string githubUsername;
        uint256 totalContributions;
        uint256 lastActiveTimestamp;
        bool isActive;
        uint256 joinedTimestamp;
    }

    struct ContributionMetrics {
        uint256 commits;
        uint256 pullRequests;
        uint256 codeReviews;
        uint256 issuesResolved;
        uint256 linesAdded;
        uint256 linesRemoved;
    }

    mapping(address => Contributor) public contributors;
    mapping(string => address) public githubToAddress;
    mapping(address => ContributionMetrics) public contributionHistory;
    
    address[] public contributorAddresses;
    uint256 public totalRevenue;
    uint256 public distributedRevenue;
    uint256 public inactivityThreshold = 90 days;
    uint256 public minimumContributionScore = 100;
    
    // Backend authorization
    mapping(address => bool) public authorizedBackends;
    
    event ContributorAdded(address indexed contributor, string githubUsername);
    event ContributorUpdated(address indexed contributor, uint256 newShares);
    event ContributorDeactivated(address indexed contributor);
    event RevenueDistributed(uint256 amount, uint256 timestamp);
    event ContributionScoreUpdated(address indexed contributor, uint256 score);

    modifier onlyAuthorizedBackend() {
        require(authorizedBackends[msg.sender] || msg.sender == owner(), "Unauthorized backend");
        _;
    }

    modifier onlyActiveContributor() {
        require(contributors[msg.sender].isActive, "Contributor not active");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply
    ) ERC20(_name, _symbol) {
        _mint(address(this), _initialSupply * 10**decimals());
    }

    // Admin Functions
    function addAuthorizedBackend(address _backend) external onlyOwner {
        authorizedBackends[_backend] = true;
    }

    function removeAuthorizedBackend(address _backend) external onlyOwner {
        authorizedBackends[_backend] = false;
    }

    function addContributor(
        address _contributor,
        string memory _githubUsername,
        uint256 _initialShares
    ) external onlyAuthorizedBackend {
        require(_contributor != address(0), "Invalid address");
        require(bytes(_githubUsername).length > 0, "Invalid GitHub username");
        require(contributors[_contributor].wallet == address(0), "Contributor already exists");

        contributors[_contributor] = Contributor({
            wallet: _contributor,
            githubUsername: _githubUsername,
            totalContributions: 0,
            lastActiveTimestamp: block.timestamp,
            isActive: true,
            joinedTimestamp: block.timestamp
        });

        githubToAddress[_githubUsername] = _contributor;
        contributorAddresses.push(_contributor);

        if (_initialShares > 0) {
            _transfer(address(this), _contributor, _initialShares);
        }

        emit ContributorAdded(_contributor, _githubUsername);
    }

    function updateContributorShares(
        address _contributor,
        uint256 _contributionScore,
        ContributionMetrics memory _metrics
    ) external onlyAuthorizedBackend {
        require(contributors[_contributor].isActive, "Contributor not active");
        
        Contributor storage contributor = contributors[_contributor];
        contributor.totalContributions = _contributionScore;
        contributor.lastActiveTimestamp = block.timestamp;
        
        contributionHistory[_contributor] = _metrics;

        // Calculate new share allocation based on contribution score
        uint256 newShares = calculateSharesFromScore(_contributionScore);
        uint256 currentShares = balanceOf(_contributor);

        if (newShares > currentShares) {
            uint256 additionalShares = newShares - currentShares;
            require(balanceOf(address(this)) >= additionalShares, "Insufficient contract balance");
            _transfer(address(this), _contributor, additionalShares);
        } else if (newShares < currentShares) {
            uint256 sharesToReclaim = currentShares - newShares;
            _transfer(_contributor, address(this), sharesToReclaim);
        }

        emit ContributorUpdated(_contributor, newShares);
        emit ContributionScoreUpdated(_contributor, _contributionScore);
    }

    function calculateSharesFromScore(uint256 _score) public pure returns (uint256) {
        // Convert score to shares with scaling factor
        // This is a simplified calculation - you can make it more sophisticated
        if (_score < 100) return 0;
        if (_score < 500) return _score * 2;
        if (_score < 1000) return _score * 3;
        if (_score < 5000) return _score * 4;
        return _score * 5;
    }

    function deactivateInactiveContributors() external onlyAuthorizedBackend {
        for (uint256 i = 0; i < contributorAddresses.length; i++) {
            address contributorAddr = contributorAddresses[i];
            Contributor storage contributor = contributors[contributorAddr];
            
            if (contributor.isActive && 
                block.timestamp - contributor.lastActiveTimestamp > inactivityThreshold) {
                
                contributor.isActive = false;
                
                // Reclaim shares from inactive contributors
                uint256 shares = balanceOf(contributorAddr);
                if (shares > 0) {
                    _transfer(contributorAddr, address(this), shares);
                }
                
                emit ContributorDeactivated(contributorAddr);
            }
        }
    }

    function reactivateContributor(address _contributor) external onlyAuthorizedBackend {
        require(contributors[_contributor].wallet != address(0), "Contributor doesn't exist");
        contributors[_contributor].isActive = true;
        contributors[_contributor].lastActiveTimestamp = block.timestamp;
    }

    // Revenue Distribution
    function distributeRevenue() external payable onlyOwner nonReentrant {
        require(msg.value > 0, "No revenue to distribute");
        
        uint256 totalShares = totalSupply() - balanceOf(address(this));
        require(totalShares > 0, "No active contributors");
        
        totalRevenue += msg.value;
        
        for (uint256 i = 0; i < contributorAddresses.length; i++) {
            address contributorAddr = contributorAddresses[i];
            if (contributors[contributorAddr].isActive) {
                uint256 contributorShares = balanceOf(contributorAddr);
                if (contributorShares > 0) {
                    uint256 payment = (msg.value * contributorShares) / totalShares;
                    if (payment > 0) {
                        payable(contributorAddr).transfer(payment);
                    }
                }
            }
        }
        
        distributedRevenue += msg.value;
        emit RevenueDistributed(msg.value, block.timestamp);
    }

    function withdrawRevenue() external onlyActiveContributor nonReentrant {
        uint256 shares = balanceOf(msg.sender);
        require(shares > 0, "No shares to claim revenue");
        
        uint256 contractBalance = address(this).balance;
        uint256 totalShares = totalSupply() - balanceOf(address(this));
        
        if (contractBalance > 0 && totalShares > 0) {
            uint256 payment = (contractBalance * shares) / totalShares;
            if (payment > 0) {
                payable(msg.sender).transfer(payment);
            }
        }
    }

    // View Functions
    function getContributor(address _contributor) external view returns (
        string memory githubUsername,
        uint256 totalContributions,
        uint256 lastActiveTimestamp,
        bool isActive,
        uint256 shares
    ) {
        Contributor memory contributor = contributors[_contributor];
        return (
            contributor.githubUsername,
            contributor.totalContributions,
            contributor.lastActiveTimestamp,
            contributor.isActive,
            balanceOf(_contributor)
        );
    }

    function getContributorByGithub(string memory _githubUsername) external view returns (
        address wallet,
        uint256 totalContributions,
        uint256 shares
    ) {
        address contributorAddr = githubToAddress[_githubUsername];
        require(contributorAddr != address(0), "Contributor not found");
        
        return (
            contributorAddr,
            contributors[contributorAddr].totalContributions,
            balanceOf(contributorAddr)
        );
    }

    function getAllContributors() external view returns (address[] memory) {
        return contributorAddresses;
    }

    function getContributionMetrics(address _contributor) external view returns (ContributionMetrics memory) {
        return contributionHistory[_contributor];
    }

    function getEquityDistribution() external view returns (
        address[] memory addresses,
        uint256[] memory shares,
        uint256[] memory percentages
    ) {
        uint256 totalActiveShares = totalSupply() - balanceOf(address(this));
        uint256 activeCount = 0;
        
        // Count active contributors
        for (uint256 i = 0; i < contributorAddresses.length; i++) {
            if (contributors[contributorAddresses[i]].isActive && 
                balanceOf(contributorAddresses[i]) > 0) {
                activeCount++;
            }
        }
        
        addresses = new address[](activeCount);
        shares = new uint256[](activeCount);
        percentages = new uint256[](activeCount);
        
        uint256 index = 0;
        for (uint256 i = 0; i < contributorAddresses.length; i++) {
            address addr = contributorAddresses[i];
            if (contributors[addr].isActive && balanceOf(addr) > 0) {
                addresses[index] = addr;
                shares[index] = balanceOf(addr);
                percentages[index] = totalActiveShares > 0 ? 
                    (balanceOf(addr) * 10000) / totalActiveShares : 0; // Basis points
                index++;
            }
        }
    }

    // Emergency Functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Override transfers to prevent unauthorized token transfers
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override whenNotPaused {
        // Allow minting, burning, and contract-authorized transfers
        if (from == address(0) || to == address(0) || from == address(this) || to == address(this)) {
            super._beforeTokenTransfer(from, to, amount);
            return;
        }
        
        // Prevent regular transfers between users to maintain equity integrity
        require(authorizedBackends[msg.sender] || msg.sender == owner(), "Transfers not allowed");
        super._beforeTokenTransfer(from, to, amount);
    }

    receive() external payable {
        totalRevenue += msg.value;
    }
}