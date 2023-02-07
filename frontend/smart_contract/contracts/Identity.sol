// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Identity {
    struct Data
    {
        address owner;
        string name;
        uint256 dateOfBirth; // convert date to number of seconds and then store
        string gender;
        string emailAddress;
        string hashedPwd;
    } // remove this structure and compare the data with response received from UIDAI API

    struct Hosts
    {
        string name;
        address owner;
        string apiKey;
    }

    mapping(string => Data) adhaar;
    mapping(address => string) wallet;
    mapping(string => bool) deactivated;
    mapping(string => uint256[]) humanVerified; // mapped to date when human was last verified
    mapping(string => uint256[]) idCardVerified; // store the expiry period of the ID card  
    mapping(string => string[]) linkedHosts; // hosts linked to a particular user
    mapping(string => Hosts) apiForHost; // for hosts registering to use API
    mapping(string => bool) deactivatedHost;

    Hosts[] public allHosts;

    function registerIdentity(string memory _adhaar, string memory _name, uint256 _dob, string memory _gender, string memory _email, string memory _hashedPwd) public {
        require(!compareStrings(wallet[msg.sender], _adhaar), "Identity already exists!");
        require(adhaar[_adhaar].dateOfBirth <= 0, "Identity already exists!");
        adhaar[_adhaar] = Data(msg.sender, _name, _dob, _gender, _email, _hashedPwd);
        wallet[msg.sender] = _adhaar;
    } 

    function loginIdentity(string memory _adhaar) public view returns (string memory)  {
        require(compareStrings(wallet[msg.sender], _adhaar), "Wallet does not belong to the adhaar holder!");
        return adhaar[_adhaar].hashedPwd;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function humanVerify(string memory _adhaar, uint256 _today) public // _today is seconds in today's date
    {
        require(compareStrings(wallet[msg.sender], _adhaar));
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        humanVerified[_adhaar].push(_today);
    }

    function idCardVerify(string memory _adhaar, uint256 _expiry) public 
    {
        require(compareStrings(wallet[msg.sender], _adhaar));
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        idCardVerified[_adhaar].push(_expiry);
    }

    function lastHumanVerified(string memory _adhaar) public view returns (uint256)
    {
        require(compareStrings(wallet[msg.sender], _adhaar));
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        return humanVerified[_adhaar][humanVerified[_adhaar].length - 1];
    }

    function returnIdExpiry(string memory _adhaar) public view returns (uint256)
    {
        require(compareStrings(wallet[msg.sender], _adhaar));
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        return idCardVerified[_adhaar][idCardVerified[_adhaar].length - 1];
    }

    function linkAHost(string memory _adhaar, string memory _key) public 
    {
        require(compareStrings(wallet[msg.sender], _adhaar));
        require(!deactivatedHost[_key], "API has already been deactivated");
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        linkedHosts[_adhaar].push(_key);
    }

    function generateAPIKeyForHost(string memory _adhaar, string memory _name, string memory _key) public // host's adhaar needed
    {
        require(compareStrings(wallet[msg.sender], _adhaar), "The host must be verified!");
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        require(!deactivatedHost[_key], "API has already been deactivated");
        apiForHost[_key] = Hosts(_name, msg.sender, _key);
        allHosts.push(Hosts(_name, msg.sender, _key));
    }

    function isHostLinked(string memory _adhaar, string memory _key) public view returns (bool)
    {
        require(compareStrings(wallet[msg.sender], _adhaar), "Identity does not exist");
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        require(linkedHosts[_adhaar].length > 0, "No hosts linked yet!");
        require(!deactivatedHost[_key], "API has already been deactivated");
        for(uint256 i=0; i<linkedHosts[_adhaar].length;i++)
        {
            if (compareStrings(linkedHosts[_adhaar][i],_key))
            {   
                return true;
            }
        }

        return false;
    }

    function removeLinkedHost(string memory _adhaar, string memory _key) public returns (bool)
    {
        require(compareStrings(wallet[msg.sender], _adhaar), "Identity does not exist");
        require(linkedHosts[_adhaar].length > 0, "No hosts linked yet!");
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        require(!deactivatedHost[_key], "API has already been deactivated");
        uint256 flag = 0;
        for(uint256 i=0; i<linkedHosts[_adhaar].length;i++)
        {
            if (compareStrings(linkedHosts[_adhaar][i],_key))
            {
                flag = 1;
                for(uint256 j=i; j<linkedHosts[_adhaar].length-1;j++)
                {
                    linkedHosts[_adhaar][j] = linkedHosts[_adhaar][j+1];
                }
                break;
            }
        }

        if (flag == 0)
            return false;
        else
        {
            linkedHosts[_adhaar].pop();
            return true;
        }
    }

    function returnIdentity(string memory _adhaar) public view returns (Data memory)
    {
        require(compareStrings(wallet[msg.sender], _adhaar));
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        return adhaar[_adhaar];
    }

    function deactivate(string memory _adhaar) public 
    {
        require(compareStrings(wallet[msg.sender], _adhaar), "Address does not belong to adhaar holder");
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        deactivated[_adhaar] = true;
    }

    function returnHosts() public view returns (Hosts[] memory)
    {
        return allHosts;
    }

    function deactivateHost(string memory _adhaar, string memory _key) public
    {
        require(compareStrings(wallet[msg.sender], _adhaar));
        require(apiForHost[_key].owner == msg.sender);
        require(!deactivated[_adhaar], "Adhaar has been deactivated");
        require(!deactivatedHost[_key], "API has already been deactivated");

        deactivatedHost[_key] = true;
    }

}