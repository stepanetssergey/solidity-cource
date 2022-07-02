const variables = () => {
  if (process.env.ENV_VARIABLE === "production") {
    return {
      BLOCKCHAIN_NODE:
        "https://mainnet.infura.io/v3/c7f74b7feee44d2882a7d6a845b91f25",
      IDO_CONTRACT: "0xA040aee5190B14Ca908e59DF4251EA7C269750D3",
      USDT_TOKEN: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      IDO_TOKEN: "0x56d8AA7128652EAf13E5B1c36cdEe4920fc35506",
      CHAIN_ID: 1,
    };
  } else {
    return {
      BLOCKCHAIN_NODE:
        "https://ropsten.infura.io/v3/eaba63c1de1448b787f6d2d4bdbd287c",
      IDO_CONTRACT: "0xA040aee5190B14Ca908e59DF4251EA7C269750D3",
      USDT_TOKEN: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      IDO_TOKEN: "0x56d8AA7128652EAf13E5B1c36cdEe4920fc35506",
      CHAIN_ID: 3,
    };
  }
};

export default variables;
