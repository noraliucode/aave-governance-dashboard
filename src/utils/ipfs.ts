const { create } = require("ipfs-http-client");

const ipfs = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

export async function get(cid: string) {
  const getFile = await ipfs.object.get(cid);
  return Buffer.from(getFile.Data).toString();
}

export async function parseIpfsHash(ipfsHash: string) {
  const format = "12" + "20" + ipfsHash.substring(2);
  const cid = require("bs58").encode(Buffer.from(format, "hex"));
  return cid;
}
