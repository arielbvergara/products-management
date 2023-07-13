'use client'

export default function SimpleMessageContainer({children}) {
  return (
    <div className="text-gray-600 text-center">
        <h4>
          {children}
        </h4>
      </div>
  )
}