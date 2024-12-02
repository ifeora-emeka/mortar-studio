'use client';
import { useState } from 'react';
import Frame from 'react-frame-component';

export default function Builder() {
    const [className, setClassName] = useState('');

    return (
        <div className="min-h-screen">
            <Frame
                className={'h-80 w-screen'}
                initialContent={`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src="https://cdn.tailwindcss.com"></script>
                        <script>
    tailwind.config = {
                            // darkMode: 'class',
      theme: {
        extend: {
          colors: {
            my_color: '#da373d',
          }
        }
      }
    }
  </script>
                    </head>
                    <body className="h-screen bg-gray-50 p-10 dark">
                        <div id="frame-root"></div>
                    </body>
                    </html>
                `}
                mountTarget="#frame-root"
            >
                <div className={`container mx-auto ${className}`}>
                    <h1>Left</h1>
                    <h1>Right</h1>
                </div>
            </Frame>
            <div className="p-4">
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Enter Tailwind classes..."
                    onChange={(e) => setClassName(e.target.value)}
                />
                <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Apply Class
                </button>
            </div>
        </div>
    );
}
