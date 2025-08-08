const { ethers } = require('ethers');
const asyncErrorHandler = require('../middlewares/helpers/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

const ERC20_ABI = [
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

exports.getTokenName = asyncErrorHandler(async (req, res, next) => {
    try {
        const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
        
        const tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT
        
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        
        const tokenName = await tokenContract.name();
        
        console.log(`successfully get the token name: ${tokenName}`);
        
        res.status(200).json({
            success: true,
            message: 'ERC20 API Test - Successfully get the ERC20 token information',
            data: {
                contractAddress: tokenAddress,
                tokenName: tokenName,
                network: 'Ethereum Mainnet',
            }
        });
        
    } catch (error) {
        console.error(error.message);
        return next(new ErrorHandler(`${error.message}`, 500));
    }
});
