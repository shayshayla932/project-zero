import { addPropertyControls, ControlType } from "framer"

/**
 * English "Personalized" module. Animation plays from the published page.
 *
 * @framerIntrinsicWidth 1360
 * @framerIntrinsicHeight 780
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function PersonalizedModule(props) {
    const base = (props.page || "https://shayshayla932.github.io/project-zero").replace(/\/$/, "")
    return (
        <iframe
            title="Personalized"
            src={`${base}/?module=personalized&lang=en`}
            style={{ border: "none", background: "#ffffff", width: "100%", height: "100%", ...props.style }}
        />
    )
}

addPropertyControls(PersonalizedModule, {
    page: {
        type: ControlType.String,
        title: "Page",
        defaultValue: "https://shayshayla932.github.io/project-zero",
    },
})
