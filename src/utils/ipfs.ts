const { create } = require("ipfs-http-client");

const ipfs = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

export async function get(cid: string) {
  const catFile = await ipfs.cat(cid);
  const buffers = [];
  for await (const item of catFile) {
    buffers.push(Buffer.from(item));
  }
  const file = Buffer.concat(buffers);
  return file.toString();
}

export function parseIpfsHash(ipfsHash: string) {
  const format = "12" + "20" + ipfsHash.substring(2);
  const cid = require("bs58").encode(Buffer.from(format, "hex"));
  return cid;
}
