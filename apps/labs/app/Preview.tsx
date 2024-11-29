'use client';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { Provider } from '@/components/ui/provider';
import { Text } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';

export default function Preview() {
    return (
        <Frame
            className="h-80 w-80"
            initialContent={`
                <!DOCTYPE html>
                <html>
                    <head>
                        <style>
                            body { margin: 0; padding: 0; box-sizing: border-box; }
                        </style>
                    </head>
                    <body>
                        <div class="frame-root"></div>
                    </body>
                </html>
            `}
        >
            <FrameContextConsumer>
                {({ document, window }) => (
                    <Provider>
                        <div>
                            <Text textStyle="2xl">My Large Heading</Text>
                            <Button>My Chakra Button</Button>
                        </div>
                    </Provider>
                )}
            </FrameContextConsumer>
        </Frame>
    );
}