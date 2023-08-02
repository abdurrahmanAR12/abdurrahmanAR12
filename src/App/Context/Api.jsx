import { createContext, useEffect, useState } from "react"
export const api_context = createContext();
export let token_string = "t_p$e_x_l_$s+s(o)+n)(e", token = localStorage[token_string];

export function Api_state({ children }) {
    const api_keys = ["33398349-05a073fe8f03ea0c628dc4ac4"];
    let [s_val, setSval] = useState(""),
        server_url = `${process.env.REACT_APP_protocol}://${process.env.REACT_APP_host}`,
        [userInfo, setUserInfo] = useState();

    function getUser() {
        let url = `${server_url}/users/get`;
        fetch(url, { headers: { "token": token } }).then(res => res.json()).then(info => setUserInfo(info));
    }

    const onChange = e => {
        let v = (e.target.value.replace(/[/]/g, ""));
        v = (v.replace(/[\\]/g, ""));
        setSval(v)
    };

    useEffect(() => {
        if (token)
            getUser();
    }, [])

    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
        circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
        circle.classList.add("ripple");
        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple)
            ripple.remove();
        button.appendChild(circle);
    }
    return (<api_context.Provider value={{ api_keys, createRipple, userInfo, getUser, s_val, server_url, setSval, onChange }}>
        {children}
    </api_context.Provider>)
}