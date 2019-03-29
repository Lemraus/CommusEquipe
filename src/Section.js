import React from "react";
import Member from "./Member";

import { NewMemberForm, EditMemberForm } from "./MemberForm";
import "./static/css/Section.css";

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: this.props.members
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            members: props.members
        });
    }

    addMember = (member) => {
        this.setState(prevState => ({
            members: [...prevState.members, member]
        }));
    }

    render() {
        const { year, loggedIn, name } = this.props;
        const { members } = this.state;

        const formatedName = (name.charAt(0).toUpperCase() + name.substring(1)).replace(/_/g, " "); // titre_de_ouf => Titre de ouf

        return (
            <div className={"Section " + name}>
                <h1>{formatedName}</h1>

                {loggedIn && <NewMemberForm year={year} section={name} addMember={this.addMember} />}

                <div className="members">
                    {members.map(member => (
                        <Member year={year} loggedIn={loggedIn} section={name} id={member._id} name={member.name} poste={member.poste} photoPath={member.photoPath} />
                    ))}
                </div>
            </div>
        )
    };
}

export default Section;