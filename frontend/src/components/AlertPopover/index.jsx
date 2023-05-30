import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';


export function AlertPopover({children, log_error} ) {
    const [logs,setLogs] = useState([]);
    if(log_error.length > 0) {
        setLogs(log_error.split(';'))
    }
    
    return (
        // <Popover.Root>
        //     <Popover.Trigger> 
        //       {children}
        //     </Popover.Trigger>
            
        //     <Popover.Portal>
        //         <Popover.Content style={"min-width: '32rem'; border-radius: '0.5rem'; background-color: '#80868b'" }>
                  
                    <ul>
                        {
                            logs.length > 0 ??
                            logs.map(error => {
                                return <li>{error}</li>
                            })
                        }
                    </ul>

        //             <Popover.Arrow height={8} width={16} style={{ fill: '#80868b' }} />
        //         </Popover.Content>
        //     </Popover.Portal>
        // </Popover.Root>
    )
}