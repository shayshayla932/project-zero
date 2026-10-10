import { addPropertyControls, ControlType } from "framer"

/**
 * English "Professional" module. Animation plays from the published page.
 *
 * @framerIntrinsicWidth 1360
 * @framerIntrinsicHeight 780
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function ProfessionalModule(props) {
    const base = (props.page || "https://shayshayla932.github.io/project-zero").replace(/\/$/, "")
    return (
        <iframe
            title="Professional"
            src={`${base}/professional.html`}
            style={{ border: "none", background: "transparent", width: "100%", height: "100%", ...props.style }}
        />
    )
}

addPropertyControls(ProfessionalModule, {
    page: {
        type: ControlType.String,
        title: "Page",
        defaultValue: "https://shayshayla932.github.io/project-zero",
    },
})
