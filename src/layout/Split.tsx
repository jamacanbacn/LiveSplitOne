import * as React from "react";
import * as LiveSplit from "../livesplit";
import { colorToCss, gradientToCss } from "../util/ColorUtil";

export interface Props {
    splitsState: LiveSplit.SplitsComponentStateJson,
    split: LiveSplit.SplitStateJson,
    icon: string,
    separatorInFrontOfSplit: boolean,
    layoutState: LiveSplit.LayoutStateJson,
}

export default class Split extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const currentSplit = this.props.split.is_current_split ? "current-split" : "";
        const separator = this.props.separatorInFrontOfSplit ? "split-separator" : "";

        const hasIcon = this.props.icon !== "";

        const innerStyle: any = {};
        if (this.props.split.index % 2 === 1) {
            innerStyle.borderBottom = `1px solid ${colorToCss(this.props.layoutState.thin_separators_color)}`;
            innerStyle.backgroundColor = "hsla(0, 0%, 100%, 0.04)";
        } else {
            innerStyle.borderBottom = "1px solid transparent";
        }
        innerStyle.borderTop = innerStyle.borderBottom;

        if (this.props.separatorInFrontOfSplit) {
            innerStyle.borderTop = `2px solid ${colorToCss(this.props.layoutState.separators_color)}`;
        }

        const outerStyle: any = {};
        if (this.props.split.is_current_split) {
            outerStyle.background = gradientToCss(this.props.splitsState.current_split_gradient);
        }

        return (
            <span
                className={["split", currentSplit, separator].filter((s) => s.length > 0).join(" ")}
                style={outerStyle}
            >
                <div
                    className={hasIcon ? "split-icon-container" : "split-icon-container-empty"}
                    style={innerStyle}
                >
                    {
                        hasIcon &&
                        <img className="split-icon" src={this.props.icon} />
                    }
                </div>
                <div
                    className="split-name"
                    style={innerStyle}
                >
                    {this.props.split.name}
                </div>
                <div
                    className="split-delta time"
                    style={{
                        ...innerStyle,
                        color: colorToCss(this.props.split.visual_color),
                    }}
                >
                    {this.props.split.delta}
                </div>
                <div
                    className="split-time time"
                    style={innerStyle}
                >
                    {this.props.split.time}
                </div>
            </span>
        );
    }
}
