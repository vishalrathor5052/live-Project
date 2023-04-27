import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import axios from "../../components/common/constants";
import Loader from "../../components/common/Loader";

const Support = () => {
  const [createticket, setCreateTicket] = useState("");
  const [pendingticket, setPendingTicket] = useState([]);
  let ticketstatu: any = [];
  const [faq, setFaq] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const HandleTicket = () => {
    const paylod = {
      ticketQuote: createticket,
      ticketStatus: 1,
      updatedBy: 1,
    };
    axios
      .post("/companies/createTickets", paylod)
      .then((res: any) => {
        if (res.status === 200) {
          if (res.data !== "") {
            setCreateTicket("");
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  };
  // ................................Get Tickets Api......................

  useEffect(() => {
    axios
      .get("/companies/getTickets")
      .then((res: any) => {
        if (res.status === 200) {
          setLoader(false);
          if (res.data !== "") {
            setPendingTicket(res?.data?.data);
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, [createticket]);

  if (pendingticket.length > 0) {
    ticketstatu = pendingticket.filter((e: any) => e?.ticketStatus === 1);
  }
  // .....................................Get FaQ Api...............................
  useEffect(() => {
    search.length === 0 &&
      axios.get("/companies/getFaq").then((res: any) => {
        if (res.status === 200) {
          setFaq(res?.data?.data);
        }
      });
  }, [search]);
  const HandleSearch = async (inputValue: any) => {
    if (inputValue) {
      const newData = await faq?.filter(function (item: any) {
        const itemData = item?.question ? item?.question.toUpperCase() : "";
        const textData = inputValue.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setFaq(newData);
    } else {
      setFaq(faq);
    }
  };
  
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="support-main">
          <div className="support-container">
            <div className="support-left-content">
              <p className="support-title">Support</p>
            </div>
            <div className="search-container">
              <form action="/action_page.php">
                <input
                  type="text"
                  onChange={(e: any) => setSearch(e.target.value)}
                  placeholder="Search.."
                  name="search"
                  style={{ marginTop: "0px" }}
                />
                <button
                  type="button"
                  onClick={() => HandleSearch(search)}
                  className="search-btn"
                  style={{ marginTop: "0px" }}
                >
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
          <div className="support-bottom-section">
            <div className="support-left-section">
              <p className="create-ticket-title">Create a ticket</p>
              <div className="create-input-box">
                <div className="inputBox input-create">
                  <input
                    type="text"
                    onChange={(e: any) => {
                      setCreateTicket(e.target.value);
                    }}
                    value={createticket}
                  />
                </div>
                <button className="create-button" onClick={HandleTicket}>
                  CREATE
                </button>
              </div>
              <div className="faq-container">
                <p className="faq-title">Search in FAQ's</p>
                {faq?.map((obj: any, index: number) => {
                  return (
                    <Accordion style={{ marginTop: "15px" }}>
                      <Accordion.Item eventKey={`${index}`}>
                        <Accordion.Header>{obj.question}</Accordion.Header>
                        <Accordion.Body>{obj.answer}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  );
                })}
              </div>
            </div>
            <div className="support-right-section">
              <p className="create-ticket-title">Pending Tickets</p>
              {ticketstatu.map((e: any, index: number) => {
                return (
                  // <div className="pending-tickets-content">
                  //   <Link to={"/support"} className="link-menu" onClick={chatBoat}>
                  //     {e.ticketQuote}
                  //   </Link>
                  // </div>
                  <div className="chat-box-support">
                    <Accordion style={{ marginTop: "15px" }}>
                      <Accordion.Item eventKey={`${index}`}>
                        <Accordion.Header
                          style={{ color: "blue", borderColor: "blue" }}
                        >
                          {e.ticketQuote}
                        </Accordion.Header>
                        <Accordion.Body style={{ marginLeft: "0" }}>
                          <p className="create-ticket-title">Support</p>
                          <div className="user-chat">
                            <div className="chat-box-user">
                              <p>{e.ticketQuote}</p>
                            </div>
                          </div>
                          <div className="chat-box-admin">
                            <div className="admin-reply">
                              <p>{e.ticketReply ?? "admin reply"}</p>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
