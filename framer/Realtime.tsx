import { addPropertyControls, ControlType } from "framer"

/**
 * English "Real-time" module: copy plus the looping product animation.
 * Framer can only embed https. The animation appears after this version is on GitHub Pages.
 *
 * @framerIntrinsicWidth 1360
 * @framerIntrinsicHeight 780
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function RealtimeModule(props) {
    return <ModuleFrame title="Real-time" module="realtime" page={props.page} style={props.style} />
}

addPropertyControls(RealtimeModule, {
    page: {
        type: ControlType.String,
        title: "Page",
        defaultValue: "https://shayshayla932.github.io/project-zero",
    },
})

function ModuleFrame({ title, module, page, style }) {
    const base = page || "https://shayshayla932.github.io/project-zero"
    const src = `${base.replace(/\/$/, "")}/${module}.html`
    return (
        <iframe
            title={title}
            src={src}
            style={{
                border: "none",
                background: "#ffffff",
                width: "100%",
                height: "100%",
                ...style,
            }}
        />
    )
}
