// Import Solana web3 functionalities
const {
    Connection, 
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL
  } = require("@solana/web3.js");
  
  // Import prompt module
  const prompt = require('prompt-sync')();
  
  // Connect to the Devnet
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
  const getWalletBalance = async (publicKey) => {
    try {
      // Get balance of user provided public key
      const walletBalance = await connection.getBalance(new PublicKey(publicKey));
      console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
      console.log(err);
    }
  };
  
  const airDropSol = async (publicKey) => {
    try {
      // Request airdrop to user public key  
      console.log("Airdropping some SOL to the wallet!");
      const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(publicKey),  
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
      console.log(err);
    }
  };
  
  // Prompt user for public key
  const userPublicKey = prompt('Enter your public key: ');
  
  // Show balance before and after airdrop  
  const main = async () => {
    await getWalletBalance(userPublicKey);
    await airDropSol(userPublicKey);
    await getWalletBalance(userPublicKey);
  }
  
  main();
  