import { useEffect, useState } from "react";
import { listEnquiries } from "../../api/fetchApi";
import AdminNavbar from "../AdminNavbar";

function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      const res = await listEnquiries();
      console.log(res.data);

      setEnquiries(res.data);
    } catch (error) {
      console.error("Failed to load enquiries", error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5">
        <h3>Enquiries</h3>
        <table className="table table-bordered table-striped mt-3">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Message</th>
              <th>Related Package</th>
              <th>Related Schedule</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq, index) => (
              <tr key={enq.id}>
                <td>{index + 1}</td>
                <td>{enq.name}</td>
                <td>{enq.mobile}</td>
                <td>{enq.email}</td>
                <td>{enq.message}</td>
                <td>{enq.package ? enq.package.title : "-"}</td>
                <td>{enq.schedule ? enq.schedule.title : "-"}</td>
                <td>{new Date(enq.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnquiryList;
