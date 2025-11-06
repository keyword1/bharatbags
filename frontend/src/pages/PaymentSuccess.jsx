import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { backendUrl } from "../../../admin/src/App";
//=====================

// import "dotenv/config";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { txnid } = useParams();
  const status = searchParams.get("status");
  const whatsapp_info = JSON.parse(
    decodeURIComponent(searchParams.get("whatsapp_info"))
  );
  console.log("whatsapp info: ", whatsapp_info);
  const sendWhatsapp = async () => {
    const response = await axios({
      url: `https://graph.facebook.com/v22.0/802860382911251/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: {
        messaging_product: "whatsapp",
        to: "917013715093",
        type: "template",
        template: {
          name: "sale_alerts",
          language: { code: "en_US" },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: whatsapp_info.orderId.toString(), //"520",
                },
                {
                  type: "text",
                  text: whatsapp_info.amount.toString(), //"250",
                },
                {
                  type: "text",
                  text: whatsapp_info.payu_id, //"10023568",
                },
              ],
            },
          ],
        },
      },
    });
    console.log(response.data);
  };

  useEffect(() => {
    if (status === "success") {
      sendWhatsapp();
      navigate("/orders");
    } else {
      console.log("pay wasn't success");
    }
  }, [navigate, status]);

  return (
    <>
      {status !== "success" && (
        <div className="flex items-center justify-center h-screen flex-col">
          <h2>Payment didn't go through, please try again</h2>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
