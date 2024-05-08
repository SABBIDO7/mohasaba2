import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Modals = forwardRef((props, ref) => {
  const [checkInSeachAccountsShow, setCheckInSeachAccountsShow] =
    useState(false);
  const [data, setData] = useState([]);
  useImperativeHandle(ref, () => ({
    setCheckInSeachAccountsShow, // Expose the function via ref
    setData,
  }));

  useEffect(() => {});

  return (
    <>
      <Modal
        show={checkInSeachAccountsShow}
        onHide={() => {
          setCheckInSeachAccountsShow(false);
          props.setShowLocation(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="h-[43rem] overflow-y-auto">
          {data &&
            data.map((io, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-secondd text-BgTextColor shadow-sm p-2 rounded my-2"
                  onClick={(e) => {
                    // console.log(io);
                    // props.setchangingAccountInvoiceFromDB(props.Client.RefNo);
                    // selectHandler(io, idx);
                  }}
                >
                  <div className="card-body">
                    <div className="flex-wrap">
                      <div className="flex flex-row justify-between">
                        <div>
                          <p className="me-3 mb-0 card-title">
                            {/* <strong>AccNo:</strong>{" "} */}
                            {io["AccNo"] != null && io["AccNo"] != ""
                              ? io["AccNo"]
                              : "--"}
                          </p>
                        </div>
                        <div>
                          <p className="me-3 mb-0">
                            {/* <strong>AccName:</strong> */}
                            {io["AccName"] != null && io["AccName"] != ""
                              ? io["AccName"].slice(0, 40)
                              : "--"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div>
                          <p className="me-3 mb-0">
                            {/* <strong>Address:</strong> */}
                            {io["Address"] != null && io["Address"] != ""
                              ? io["Address"]
                              : "--"}
                          </p>
                        </div>
                        <div>
                          <p className="me-3 mb-0">
                            {/* <strong>Tel:</strong> */}
                            {io["Tel"] != null && io["Tel"] != ""
                              ? io["Tel"]
                              : "--"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="me-3 mb-0">
                          <strong>Bal:</strong>
                          {io["Balance"] != null && io["Balance"] != ""
                            ? " " +
                              io["Balance"].toLocaleString() +
                              " " +
                              io["Cur"]
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Modal.Body>

        {/* <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer> */}
      </Modal>
    </>
  );
});
export default Modals;
