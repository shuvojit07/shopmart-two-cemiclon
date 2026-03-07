export const getResolutionTemplate = (order, action) => {
  const isRefund = action === "refunded";
  return `
    <div style="font-family: sans-serif; padding: 40px; color: #334155;">
      <h2 style="color: ${isRefund ? '#d97706' : '#1e293b'};">Resolution Decision</h2>
      <p>Hello,</p>
      <p>This email is to notify you that our admin team has reached a decision regarding the dispute for <strong>Order #${order.tran_id}</strong>.</p>
      <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <p><strong>Outcome:</strong> ${isRefund ? 'Refund to Buyer' : 'Released to Seller'}</p>
        <p><strong>Reason:</strong> Violation of escrow policy or product verified by proof.</p>
      </div>
      <p>The funds will be updated in your dashboard within 24 hours.</p>
      <p>Best regards,<br/>ShopMart Security Team</p>
    </div>
  `;
};