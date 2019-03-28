import React from "react";
import Section from "./Section"
import "./Team.css";
import { apiPort } from "./App";

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            sections: ["bureau", "rôles", "troupe", "régie", "com", "musique_et_chant", "mise_en_scène", "chorégraphie", "orchestre", "décors_et_costumes"],
            members: {}
        }
    }

    componentWillMount() {
        for (let section of this.state.sections) {
            this.state.members[section] = [];
        }

        const getMembresReq = new XMLHttpRequest();
        const app = this;
        getMembresReq.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const unfilteredMembers = JSON.parse(this.responseText);
                const filteredMembers = {}

                for (let section of app.state.sections) {
                    filteredMembers[section] = unfilteredMembers.filter(membre => membre.section === section);
                }

                app.setState({ members: filteredMembers });
            }
        }
        getMembresReq.open("GET", `http://localhost:${apiPort}/api/equipe/` + this.state.year);
        getMembresReq.send();
    }

    render() {
        const { year, sections, members } = this.state;
        return (
            <div className="Team">
                <div className="intro">
                    <div className="introText">
                        <h1>Fame</h1>
                        <p>Après les péripéties de Footloose en Mai dernier, la CommuS’ revient cette année pour vous présenter Fame ! Grand classique de Broadway adapté du film éponyme des années 90, Fame a déjà conquis des centaines de milliers de spectateurs à travers le monde.</p>
                        <p>Notre troupe de plus de 50 acteurs, chanteurs et danseurs vous fera plonger dans l’univers de la High School of Performing Arts où les élèves travaillent sans répit pour atteindre la célébrité.</p>
                        <p>Entre échecs et histoires d’amour, suivez ces personnages tout au long de leur scolarité pour partager leurs rires et larmes lors de ce spectacle musical  et artistique. </p>
                    </div>
                </div>

                <div className="sections">
                    {sections.map(
                        name => <Section year={year} loggedIn={this.props.loggedIn} name={name} members={members[name]} />
                    )}
                </div>
            </div>
        );
    }
}

export default Team;