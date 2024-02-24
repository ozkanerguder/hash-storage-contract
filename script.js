
async function submitText() {
    
    const text = document.getElementById("textarea").value;
    document.getElementById('textarea').addEventListener('input', function() {
        const remainingChars = this.maxLength - this.value.length;
        this.setAttribute('data-remaining', remainingChars);
    });    
    const hash = await calculateHash(text);
    const trimmedHash = hash.trim(); 
    
    // Display the hash
    document.getElementById('hashDisplay').textContent = "Hash: " + trimmedHash;
    const hashDisplay = document.getElementById('hashDisplay');

    const Status = document.getElementById('Status');
    Status.textContent = "Waiting for confirmation...   ";
  
  
        if (window.ethereum) {
          try {
          const provider = new ethers.providers.Web3Provider(window.ethereum); 
          const signer = provider.getSigner();
  
          const contractAddress = '0xD55780DdEbF4B1652bb50697B611c276945C3E5c';
          const abi = [
      {
        "inputs": [],
        "name": "currentId",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "getHash",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_hash",
            "type": "string"
          }
        ],
        "name": "storeHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "textHashes",
        "outputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
  
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
  
        const tx = await contractInstance.storeHash(trimmedHash);
        const receipt = await tx.wait(); // Wait for blockchain confirmation
        const txnHash = receipt.transactionHash;
  
        const blockExplorerLink = document.createElement('a');
      blockExplorerLink.href = `https://sepolia.etherscan.io/tx/${txnHash}`; 
      blockExplorerLink.textContent = 'View on Etherscan';
      blockExplorerLink.target = '_blank'; 
      Status.appendChild(blockExplorerLink);
      blockExplorerLink.style.color = "pink";
      blockExplorerLink.style.fontSize = "16px";
      blockExplorerLink.style.fontWeight = "bold";
//      blockExplorerLink.style.textDecoration = "none";
//      blockExplorerLink.style.border = "1px solid #ccc";
      blockExplorerLink.style.padding = "1px";
  
        console.log('Transaction Confirmed!');
        // Consider: Reset text input, provide UI confirmation
      } catch (error) {
        console.error('Transaction Error:', error);
        // Update the UI to display a friendly error message
        if (error.code === 4001) { // User rejected the transaction
        document.getElementById('Status').textContent = "Transaction Rejected";
      }
    }
    } else {
      alert('Please connect MetaMask first!');
    }
  }
  
  function displayBlockDetails(block) {
    // Example: Create new elements to display the following
    const blockNumberElement = document.createElement('p');
    blockNumberElement.textContent = "Block Number: " + block.number;
    document.body.appendChild(blockNumberElement); // (Adjust where you display this)
  
    const timestampElement = document.createElement('p');
    timestampElement.textContent = "Timestamp: " + new Date(block.timestamp * 1000).toLocaleString();
    document.body.appendChild(timestampElement); 
  
    // You can fetch and display other relevant details from the 'block' object
  }
  
  async function calculateHash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }
  
  async function connectMetamask() {
  
    if (window.ethereum) {
      try { 
        await window.ethereum.request({ method: 'eth_requestAccounts' });
              console.log('Connection request sent!');
  
              document.getElementById('connectWalletButton').textContent = "Connected!";
              // You might want to change it to 'Disconnect' at this point...
              // alternative function: https://www.youtube.com/watch?v=BQ4bJrvSi-E
            } catch (error) {
              console.error('Connection Error:', error);            
            }
          } else {
            alert('Please install MetaMask!');
          }
        }
  
  document.getElementById('connectWalletButton').addEventListener('click', connectMetamask);

  $(document).ready(function() {
    var max = 1000;
    $('#feedback').html(max + 'characters remaining');

    $('#textarea').keyup(function() {
        var text_length = $('#textarea').val().length;
        var text_remaining = max - text_length;

        $('#feedback').html(text_remaining + ' characters remaining');
    });
});