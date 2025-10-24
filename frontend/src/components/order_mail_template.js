export const order_mail_template = (data) => {
  return `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Order Has Been Successfully Placed</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
    "
  >
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="max-width: 600px; margin: auto; background-color: #ffffff;"
    >
      <tr>
        <td
          align="center"
          bgcolor="#ffc400"
          style="padding: 20px 0; color: #000000;"
        >
          <h2 style="margin: 0;">[Your Brand Name]</h2>
        </td>
      </tr>

      <tr>
        <td style="padding: 30px 20px;">
          <h2 style="color: #333333;">Order Confirmation</h2>
          <p style="color: #555555; font-size: 16px;">
            Hello <strong>[Customer Name]</strong>,
          </p>
          <p style="color: #555555; font-size: 15px; line-height: 1.6;">
            Thank you for your order! We are happy to inform you that your
            payment has been successfully processed. Your order is now confirmed
            and being prepared.
          </p>

          <table
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="10"
            style="margin-top: 20px; background-color: #f9f9f9;"
          >
            <tr>
              <td><strong>Order ID:</strong></td>
              <td>[Order #12345]</td>
            </tr>
            <tr>
              <td><strong>Amount Paid:</strong></td>
              <td>₹[Amount]</td>
            </tr>
            <tr>
              <td><strong>Payment Date:</strong></td>
              <td>[Date]</td>
            </tr>
          </table>

          <p
            style="
              color: #555555;
              font-size: 15px;
              line-height: 1.6;
              margin-top: 20px;
            "
          >
            We’ll notify you once your order is shipped. You can track your
            order status anytime using the link below:
          </p>

          <p style="text-align: center; margin: 30px 0;">
            <a
              href="[TrackOrderLink]"
              style="
                background-color: #ffc400;
                color: #000000;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 5px;
                display: inline-block;
              "
              >Track My Order</a
            >
          </p>

          <p
            style="
              color: #777777;
              font-size: 14px;
              text-align: center;
              border-top: 1px solid #e6e6e6;
              padding-top: 20px;
            "
          >
            Thank you for shopping with <strong>[Your Brand Name]</strong>!<br />
            For support, contact us at
            <a href="mailto:[SupportEmail]" style="color: #2b7de9;"
              >[SupportEmail]</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td
          align="center"
          bgcolor="#2b7de9"
          style="color: #ffffff; padding: 15px; font-size: 14px;"
        >
          © [Year] [Your Brand Name]. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
