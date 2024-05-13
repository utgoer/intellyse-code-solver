import type { EffectCallback } from "react"
import { useEffect, useRef } from "react"
import { GPTModelName } from "./types"

// To bypass double trigger of useEffects in development mode.
export function useOnMountUnsafe(effect: EffectCallback) {
    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            effect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export function mapModelName(modelName: GPTModelName) {

    switch (modelName) {
        case 'gpt-35-turbo':
            return 'GPT-3.5';
        case 'gpt-4-turbo':
            return 'GPT-4';
        default:
            return 'None';
    }
}

