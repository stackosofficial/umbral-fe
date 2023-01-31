const Web3 = require('web3');

const web3 = new Web3("http://localhost:8545/");

const isListening = async () => {
  try{ let netIsListening = await web3.eth.net.isListening();
    console.log("net is listening: ", netIsListening);
  }catch(e){ console.error("net is not listening",e); }
}

isListening()



module.exports = {};
