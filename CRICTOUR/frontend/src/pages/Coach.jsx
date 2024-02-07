import React, { useState, useEffect } from "react";

function Coach() {
    const [coachs, setcoachs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/coach')
            .then(response => response.json())
            .then(data => setcoachs(data))
            .catch(error => console.error(error));
    }, []);

    console.log(coachs);

    return (
        <div>
            <center>
                <h2>coach Information</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Nationality</th>
                            <th>Coaching Duration</th>
                            <th>Image</th>
                            <th>Person ID</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coachs.map(coach => (
                            <tr key={coach.personid}>
                                <td>{coach.full_name}</td>
                                <td>{coach.nationality}</td>
                                <td>{coach.coaching_duration}</td>
                                <td><img src={coach.image} alt="coach" style={{ maxWidth: "100px" }} /></td>
                                <td>{coach.personid}</td>
                                <td>{coach.team_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Coach;
