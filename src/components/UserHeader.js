import React from "react";
import { connect } from "react-redux";
// import { fetchUser } from "../actions";

class UserHeader extends React.Component {
  //   componentDidMount() {
  //     // console.log(this.props);
  //     this.props.fetchUser(this.props.userId);
  //   }
  render() {
    //prev code, The next is optimized in sense of filtering user at mapStateToProps
    //const user = this.props.users.find((user) => user.id === this.props.userId);

    const { user } = this.props;
    if (!user) {
      return null;
    }
    // console.log(user);

    return <div>{user.name}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  //prev code, The next is optimized in sense of filtering user at mapStateToProps
  //return { users: state.users };
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};
// export default connect(mapStateToProps, { fetchUser })(UserHeader);
export default connect(mapStateToProps)(UserHeader);
