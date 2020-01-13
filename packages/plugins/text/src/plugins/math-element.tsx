import KaTeX from 'katex'
import * as React from 'react'
import { Editor as SlateEditor, Element, Range, Transforms } from 'slate'
import { RenderElementProps } from 'slate-react'

import { TextEditorPlugin } from '../types'

export function createMathElementPlugin({
  control,
  type = 'math',
  Component = Math
}: {
  control?: {
    title: string
    icon: React.ReactNode
  }
  type?: string
  Component?: React.ComponentType<RenderElementProps & { element: MathElement }>
} = {}): TextEditorPlugin {
  return function(editor) {
    const { controls, isInline, isVoid, renderElement } = editor

    editor.isInline = element => {
      return (element.type === type && element.inline) || isInline(element)
    }
    editor.isVoid = element => {
      return element.type === type || isVoid(element)
    }

    // eslint-disable-next-line react/display-name
    editor.renderElement = props => {
      if (props.element.type !== type) return renderElement(props)
      return <Component {...props} element={props.element as MathElement} />
    }

    if (control) {
      editor.controls = [
        ...controls,
        {
          title: control.title,
          renderIcon() {
            return control.icon
          },
          isActive,
          onClick() {
            isActive() ? unwrap() : wrap()
          }
        }
      ]
    }

    return editor

    function isActive() {
      const [match] = SlateEditor.nodes(editor, {
        match(node) {
          return node.type === type
        }
      })
      return match !== undefined
    }

    // function getElement(): MathElement | undefined {
    //   const [match] = SlateEditor.nodes(editor, {
    //     match(node) {
    //       return node.type === type
    //     }
    //   })
    //   return match && (match[0] as MathElement)
    // }

    function unwrap() {
      Transforms.removeNodes(editor, {
        match(node) {
          return node.type === type
        }
      })
    }

    function wrap() {
      const { selection } = editor
      if (!selection) return
      const isCollapsed = Range.isCollapsed(selection)

      if (isCollapsed) {
        Transforms.insertNodes(editor, {
          type,
          src: '',
          inline: true,
          children: []
        })
      } else {
        const nativeSelection = window.getSelection()
        Transforms.insertNodes(
          editor,
          {
            type,
            src: nativeSelection ? nativeSelection.toString() : '',
            inline: true,
            children: []
          },
          {
            at: selection
          }
        )
        Transforms.move(editor, {
          distance: 1
        })
      }
    }
  }
}

function Math({
  attributes,
  children,
  element
}: RenderElementProps & { element: MathElement }) {
  console.log(element)
  const { inline } = element
  let { src } = element

  // make empty formulas clickable
  if (!src) {
    src = '\\,'
  }
  // use displaystyle for block formulas
  if (!inline) {
    src = '\\displaystyle ' + src
  }

  const html = KaTeX.renderToString(src, {
    displayMode: false,
    throwOnError: false
  })

  if (inline) {
    return (
      <span {...attributes}>
        <span dangerouslySetInnerHTML={{ __html: html }} />
        {children}
      </span>
    )
  } else {
    return (
      <span {...attributes}>
        <span
          style={{ display: 'block', margin: '1em 0', textAlign: 'center' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {children}
      </span>
    )
  }
}

export interface MathElement extends Element {
  src: string
  inline: boolean
}