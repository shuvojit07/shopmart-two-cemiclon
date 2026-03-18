import Dispute from "@/models/Dispute";

export async function createDispute(data){

  const dispute = await Dispute.create(data);

  return dispute;

}

export async function resolveDispute(id){

  const dispute = await Dispute.findById(id);

  dispute.status = "resolved";

  await dispute.save();

  return dispute;

}