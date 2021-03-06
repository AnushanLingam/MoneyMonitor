import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import numeral from 'numeral'

class SavingsCircle extends React.Component {
    
    handleEdit = () => {
        this.props.editSaving(this.props.id)
    }

    render() {
        return (
            <div className="saving__container" onClick={this.handleEdit}>
                <CircularProgressbar
                    percentage={(this.props.amount / this.props.goal) * 100}
                    text={`${numeral(this.props.amount).format("$0,0.[00]")} / ${numeral(this.props.goal).format("$0,0.[00]")}`}
                    strokeWidth={5}
                    styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the part that's "complete"
                        path: {
                            // Tweak path color:
                            stroke: '#458bf9',
                            // Tweak path to use flat or rounded ends:
                            strokeLinecap: 'butt',
                            // Tweak transition animation:
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                        },
                        // Customize the circle behind the path
                        trail: {
                            // Tweak the trail color:
                            stroke: '#d6d6d6',
                        },
                        // Customize the text
                        text: {
                            // Tweak text color:
                            fill: '#458bf9',
                            // Tweak text size:
                            fontSize: '1.2rem',
                        },
                    }}
                />
                <h3>{this.props.title}</h3>
            </div>
        )
    }
}

export default SavingsCircle;