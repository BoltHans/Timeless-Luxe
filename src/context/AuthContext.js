import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext({ user: null, role: null, loading: true });

export function AuthProvider({ children }) {
    const [state, setState] = useState({ user: null, role: null, loading: true });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                setState({ user: null, role: null, loading: false });
                return;
            }
            try {
                const snap = await getDoc(doc(db, "users", currentUser.uid));
                const role = snap.exists() ? snap.data().role || "user" : "user";
                setState({ user: currentUser, role, loading: false });
            } catch (e) {
                console.error("AuthContext: failed to fetch user doc", e);
                setState({ user: currentUser, role: "user", loading: false });
            }
        });
        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
