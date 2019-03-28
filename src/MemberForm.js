import React from "react";
import { getCookie } from "./App";
import "./MemberForm.css";
import { apiPort } from "./App";

export class NewMemberForm extends React.Component {
    submitForm = (event) => {
        event.preventDefault();
        const { year, section, addMember } = this.props;
        const form = event.target;
        const name = form.name.value;
        const poste = form.poste.value;
        const photoPath = form.photoPath.value;

        const postMemberReq = new XMLHttpRequest();
        postMemberReq.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 201) {
                const _id = JSON.parse(this.responseText)._id;
                addMember({ _id, name, poste, photoPath });
                form.reset();
            }
        }
        postMemberReq.open("POST", `http://localhost:80/api/equipe`);
        postMemberReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        postMemberReq.setRequestHeader("Authorization", `Bearer ${getCookie("auth_token")}`);
        postMemberReq.send(`year=${year}&section=${section}&name=${name}&poste=${poste}&photoPath=${photoPath}`);
    }

    render() {
        const { section } = this.props;

        return (
            <div className="NewMemberForm">
                <h3>Ajouter un membre</h3>

                <form onSubmit={this.submitForm}>
                    <p>
                        <label htmlFor="name">Nom:</label><br />
                        <input type="text" name="name" />
                    </p>
                    <p>
                        <label htmlFor="poste">Poste:</label><br />
                        <input type="text" name="poste" />
                    </p>
                    <p>
                        <label htmlFor="photoPath">Chemin de la photo:</label><br />
                        <input type="text" name="photoPath" />
                    </p>
                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export class EditMemberForm extends React.Component {
    submitForm(event) {
        event.preventDefault();
        alert(event.target.name.value);
    }

    render() {
        return (
            <div className="EditMemberForm">
                <h3>Modification de {this.props.name}</h3>

                <form onSubmit={this.submitForm}>
                    <p>
                        <label htmlFor="name">Nom:</label><br />
                        <input type="text" name="name" defaultValue={this.props.name} />
                    </p>
                    <button type="submit">Modifier</button>
                </form>
            </div>
        );
    }
}