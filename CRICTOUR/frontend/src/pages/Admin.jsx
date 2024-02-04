import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
    return (
        <div>
            <center>
                <div className="btn-group container scs">
                    <Link to="/addplayer"
                        className="btn btn-primary active"
                        aria-current="page">Add</Link>
                    <Link to="delete/"
                        className="btn btn-primary active"
                        aria-current="page">Delete</Link>
                    <Link to="update/"
                        className="btn btn-primary active"
                        aria-current="page">Update</Link>
                </div>
            </center >
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        </div >
    );
}
