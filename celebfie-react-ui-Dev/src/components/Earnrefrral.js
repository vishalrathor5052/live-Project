import React, { useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Earnrefrral() {
  const[affiliatelink , Setaffiliaelink] = useState('https://demo.themenio.com/ico?ref=7d264f90653733592')
  const[copylink , Setcopylinkstatus] = useState(false)
  return (
     <div className='bg-white p-5 mb-5 text-sm'>
          <h3>Earn with Referral</h3>
          <p>Invite your friends &amp; family and receive a <strong className='font-semibold'><span className="text-green-400">bonus - 15%</span> of the value of contribution.</strong></p>
          <div className={ `copy-wrap flex items-center relative mt-4 ${copylink ? ' active' : ''}` }>
            <span className="copy-feedback hidden">Copied to Clipboard</span>
            <em className="fas fa-link"></em>
            <input type="text" className="!mb-0 !pl-8 !pr-9" value={affiliatelink} readOnly/>

            <CopyToClipboard text={affiliatelink} onCopy={() =>Setcopylinkstatus(true) }  >
                <button className="copy-trigger copy-clipboard"><em className="ti ti-files"></em></button>
            </CopyToClipboard>
            
            
          </div>
            
        </div>
  )
}


