import { addPropertyControls, ControlType } from "framer"

/**
 * English "Real-time" module. Animation plays from the published page.
 *
 * @framerIntrinsicWidth 1360
 * @framerIntrinsicHeight 780
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function RealtimeModule(props) {
    const entered = props.page || "https://shayshayla932.github.io/project-zero"
    const src = /realtime\.html(?:$|\?)/.test(entered)
        ? entered
        : `${entered.replace(/\/$/, "")}/realtime.html`
    return (
        <iframe
            title="Real-time"
            src={src}
            style={{ border: "none", background: "transparent", width: "100%", height: "100%", ...props.style }}
        />
    )
}

addPropertyControls(RealtimeModule, {
    page: {
        type: ControlType.String,
        title: "Page",
        defaultValue: "https://shayshayla932.github.io/project-zero",
    },
})
