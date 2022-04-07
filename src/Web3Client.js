import Web3 from 'web3';
let selectedAccount = '0x2d975492980b4a09119952fb7da37b77999b1acf';
export const init = () => {

    // 判断MetaMask
    let provider = window.ethereum

    if (typeof provider !== 'undefined') {
        // 选择MetaMask钱包
        provider.request({ method: 'eth_requestAccounts' }).then((result) => {
            selectedAccount = result[0]
            console.log(result, 'selected account')
        }).catch((error) => {
            // If the request fails, the Promise will reject with an error.
        });

        // 监听账户变更
        provider.on('accountsChanged', (accounts) => {
            selectedAccount = accounts[0]
            console.log(`账号变更${selectedAccount}`)
        });
        provider.request({ method: 'eth_accounts' }).then(accounts => {
            selectedAccount = accounts[0]
            console.log(`账号${selectedAccount}`)
        })

    }
    // 实例
    const web3 = new Web3('HTTP://127.0.0.1:7545')
    //获取当前网络ID
    const networkId = web3.eth.net.getId()
    // 获取节点用户数
    web3.eth.personal.getAccounts().then(accounts => {
        console.log(accounts, '节点数下的用户数')
    })
    // 获取交易
    web3.eth.getTransaction('0xb819e8d7230cab40501be2becbd38b08bda23480f992cfb759533669bb8b8cc3')
        .then(doc => console.log(doc))
    //  获取余额
    web3.eth.getBalance(selectedAccount).then(result=>{
        let balance = result.toString()
        console.log(balance)
        console.log(web3.utils.fromWei(balance,'ether'))
    });


}

export const sendEthButton = () => {
    // 判断MetaMask
    let provider = window.ethereum
    // web3.eth.getGasPrice([callback])
    if (typeof provider !== 'undefined') {
        provider
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: selectedAccount,
                        to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
                        value: '0x29a2241af62c0000',
                        gasPrice: '0x09184e72a000',
                        gas: '0x2710',
                    },
                ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);

    }

    console.log('点击事件')
}