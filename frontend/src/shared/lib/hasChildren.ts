import React from "react"

export function hasChildren(children: React.ReactNode): boolean {
    return React.Children.count(children) > 0
}