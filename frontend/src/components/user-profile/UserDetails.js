import React, { Component } from 'react';
import axios from 'axios';

// CHANGE THIS CODE TO MAKE IT LIKE PROFILE

class UserDetails extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     username: '',
  //     email: '',
  //     gender: '',
  //     portfoliosite: '',
  //     profilepic: '',
  //     resume: '',
  //     bio: '',
  //   };
// }

  // componentDidMount() {
  //   const token = localStorage.getItem('token');
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   if (token) {
  //     config.headers.Authorization = `Token ${token}`;
  //   }

  //   const back_api = "http://127.0.0.1:8000";

  //   axios
  //     .get(`${back_api}/api/profile`, config)
  //     .then(res => {
  //       console.log(res);
  //       const { gender, bio, portfoliosite, profilepic, resume } = res.data[0];
  //       const { username, email } = res.data[0].user;
  //       this.setState({
  //         gender,
  //         username,
  //         email,
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render() {
    return(
      <h1>Hello</h1>
    );
//     return (
//       <div className="details-body">
//         <p>
// Username:
//           {this.state.username}
//         </p>
//         <p>
// Gender:
//           {this.state.gender}
//         </p>
//       </div>
//     );
  }
}

export default UserDetails;
