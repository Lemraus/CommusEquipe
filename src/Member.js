import React, { Fragment } from "react";
import { EditMemberForm } from "./MemberForm";
import { getCookie } from "./App";
import "./Member.css";

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            deleted: false
        }
    }

    toggleEditing = () => {
        this.setState(prevState => ({
            editing: !prevState.editing
        }));
    }

    deleteMember = () => {
        const { id, name } = this.props;
        if (!window.confirm("Voulez-vous vraiment supprimer " + name + " ?")) return;

        const deleteReq = new XMLHttpRequest();
        const member = this;
        deleteReq.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 202) {
                member.setState({ deleted: true });
            }
        }
        deleteReq.open("DELETE", "http://localhost:85/api/equipe/" + id);
        deleteReq.setRequestHeader("Authorization", "Bearer " + getCookie("auth_token"));
        deleteReq.send();
    }

    render() {
        const { editing, deleted } = this.state;
        const { year, loggedIn, section, name, poste, photoPath } = this.props;

        return (
            <div className="Member">
                {deleted ?
                    <div className="deletedMember">
                        Le membre {name} a été supprimé
                    </div>
                    :
                    <Fragment>
                        {loggedIn ?
                            <Fragment>
                                {editing ?
                                    <EditMemberForm year={year} section={section} name={name} />
                                    :
                                    <Fragment>
                                        <img src={"../portraits/" + year + "/" + section + "/" + photoPath} className="photoMembre" />
                                        <h3>{name}</h3>
                                        <h4>{poste}</h4>
                                    </Fragment>
                                }

                                <button onClick={this.toggleEditing}>{editing ? "Stop editing" : "Switch to edit mode"}</button>
                                <button onClick={this.deleteMember}>Supprimer ce membre</button>
                            </Fragment>
                            :
                            <Fragment>
                                <img src={"../portraits/" + year + "/" + section + "/" + photoPath} className="photoMembre" />
                                <h3>{name}</h3>
                                <h4>{poste}</h4>
                            </Fragment>
                        }
                    </Fragment>
                }
            </div>
        )
    }
};

export default Member;