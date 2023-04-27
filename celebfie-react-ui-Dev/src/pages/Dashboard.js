import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LogoWhite from '../components/LogoWhite'
import TransactionTableHead from '../components/TransactionTableHead'
import TransactionTableRow from '../components/TransactionTableRow'
import LogoImage from '../images/logo.png'

export default function Dashboard(props) {

  return (
    <>

      <Header />
      
      <div className="main">
        <div className="py-5 md:pt-14 md:pb-8 w-full">
          <div className="container">
            <div className="grid grid-cols-12 gap-4">

              <div className="col-span-12 dd:col-span-4">
                <div className="bg-green-400 p-5 mb-5 text-sm text-white h-full">
                  <div className="token-balance flex items-center mb-6">
                      <div className="bg-white bg-opacity-30 w-12 h-12 p-3 flex items-center mr-3 rounded-full">
                          <LogoWhite />
                      </div>
                      <div className="token-balance-text">
                        <p className='uppercase text-yellow-200 text-xs font-medium'>Tokens Balance</p>
                        <h3 className='text-white mb-0'>120,000,000 <span className='text-sm'>TWZ</span></h3>
                      </div>
                  </div>
                  <div className="token-balance">
                      <p className='uppercase text-yellow-200 text-xs font-medium'>Your Contribution</p>
                      <ul className="token-balance-list flex items-center space-x-4 justify-between mt-2">
                        <li className="token-balance-sub"><span className="text-lg font-medium">2.646</span><span className="text-[10px] block leading-3">ETH</span></li>
                        <li className="token-balance-sub"><span className="text-lg font-medium">1.265</span><span className="text-[10px] block leading-3">BTC</span></li>
                        <li className="token-balance-sub"><span className="text-lg font-medium">6.506</span><span className="text-[10px] block leading-3">LTC</span></li>
                      </ul>
                  </div>

                </div>
              </div>

              <div className="col-span-12 dd:col-span-8">
                <div className="bg-white mb-5 text-sm h-full">

                  <div className='flex h-full'>
                      <div className='basis-1/2 py-5'>
                        <div className="token-info text-center h-full flex flex-col items-center justify-center">
                          <img className='mx-auto max-w-[40px]' src={LogoImage} />
                          <h2 className="token-info-head text-light mt-4 text-gray-300">1 ETH = 1000 TWZ</h2>
                          <h5 className="token-info-sub">1 ETH = 254.05 USD</h5>
                        </div>
                      </div>
                      <div className='basis-1/2 py-5 border-l border-solid border-gray-100  h-full flex flex-col items-center justify-center'>
                        <div className="token-info flex items-center justify-center">
                          <div>
                            <ul className="token-info-list text-base">
                              <li><span>Token Name:</span>TokenWiz</li>
                              <li><span>Ticket Symbol:</span>TWZ</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                  </div>

                </div>
              </div>

              <div className="col-span-12">
                  <div className="bg-white mb-5 text-sm p-5 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className='mb-0'>Transaction</h3>
                      <div className="card-opt">
                        <a href="#" className="uppercase text-xs font-medium">View ALL<em className="fas fa-angle-right ml-2" /></a>
                      </div>
                    </div>
                    <div className="table-wrap">

                            <table className="data-table table-space-0 border-separate w-full text-sm text-black text-left">
                                
                                <TransactionTableHead />

                                <tbody>

                                    <TransactionTableRow />
                                    <TransactionTableRow />
                                    <TransactionTableRow />
                                    
                                </tbody>
                            </table>

                        </div>
                  </div>

              </div>

              {/* <div className='col-span-12 dd:col-span-4'>
                <div className="bg-white mb-5 text-sm p-5 h-full">

                    <h3>Token Sales Progress</h3>

                    <ul className="progress-info flex justify-between">
                      <li>
                        <span className="block uppercase text-xs">Raised</span> 2,758 TWZ
                      </li>
                      <li className="text-right">
                        <span className="block uppercase text-xs">TOTAL</span> 1,500,000 TWZ
                      </li>
                    </ul>
                    <div className="progress-bar">
                      <div className="progress-hcap" data-percent={83} style={{ width: "83%" }}>
                        <div>
                          Hard cap <span className='leading-3'>1,400,000</span>
                        </div>
                      </div>
                      <div className="progress-scap" data-percent={24} style={{ width: "24%" }}>
                        <div>
                          Soft cap <span className='leading-3'>40,000</span>
                        </div>
                      </div>
                      <div
                        className="progress-percent"
                        data-percent={28}
                        style={{ width: "28%" }}
                      />
                    </div>
                    <p className="mb-1 uppercase text-yellow-400">Sales END IN</p>
                    <div className="flex items-center space-x-3">
                        <div className='rounded border border-solid border-green-400 flex-grow text-center py-2.5'>
                          <span className="text-2xl font-semibold leading-4">78</span>
                          <span className="text-xs leading-3 font-medium uppercase block text-gray-300">Day</span>
                        </div>
                        <div className='rounded border border-solid border-green-400 flex-grow text-center py-2'>
                          <span className="text-2xl font-semibold leading-4">08</span>
                          <span className="text-xs leading-3 font-medium uppercase block text-gray-300">Hour</span>
                        </div>
                        <div className='rounded border border-solid border-green-400 flex-grow text-center py-2'>
                          <span className="text-2xl font-semibold leading-4">30</span>
                          <span className="text-xs leading-3 font-medium uppercase block text-gray-300">Min</span>
                        </div>
                        <div className='rounded border border-solid border-green-400 flex-grow text-center py-2'>
                          <span className="text-2xl font-semibold leading-4">38</span>
                          <span className="text-xs leading-3 font-medium uppercase block text-gray-300">Sec</span>
                        </div>
                    </div>
                </div>

              </div> */}


            </div>
          </div>
        </div>
      </div>

      <Footer />

    </>
  )
}
