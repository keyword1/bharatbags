export const email_template = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Email Confirmation</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
      }

      .container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        width: 100%;
      }

      .header {
        background-color: #ffc400;
        padding: 20px;
        text-align: center;
      }

      .logo {
        display: block;
        width: 100px;
      }

      .content {
        padding: 30px;
        text-align: center;
      }

      .content h2 {
        color: #333333;
        font-size: 24px;
        margin-bottom: 10px;
      }

      .content p {
        font-size: 16px;
        color: #555555;
        margin: 0 0 10px;
      }

      .otp-table {
        margin: 20px auto;
        background-color: #070711;
        width: 150px;
        height: 50px;
        text-align: center;
        border-radius: 4px;
      }

      .otp-code {
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #999999;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <table class="container" cellpadding="0" cellspacing="0" border="0">
      <!-- Header -->
      <tr>
        <td class="header">
          <img src="https://via.placeholder.com/100x50.png?text=Logo" alt="Bharat Bags" class="logo" />
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td class="content">
          <h2>Please confirm your email</h2>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <p>Thanks for signing up to <strong>Bharatbags</strong>. We're happy to have you.</p>
          <p>Please enter the following code in the app to confirm your email:</p>

          <!-- OTP Code in table format -->
          <table class="otp-table" align="center" cellpadding="0" cellspacing="0">
            <tr align="center">
              <td class="otp-code">${otp}</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td class="footer">
          © 2025 Bharat Bags. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
