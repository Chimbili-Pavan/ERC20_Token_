pragma solidity >=0.4.22 <0.6.0;

//import "./IERC20.sol";

contract ERC20_Token  {
    
    // specifies the name of the toekn
    string private _nameOfToken;
    
    
    // Gives the total supply of the tokens in the eco-System
    uint256 private _totalSupply;
    
    // symbol for the token
    string private _symbol;
    
    // number of decimals used to represent the token
    uint8 private _decimals;
    
    // mapping variable to store the balances of the respected Ethereum accounts
    mapping(address => uint256) private _balances;
    
    // stores the allowances to the respective account
    mapping(address => mapping (address => uint256)) private _allowances;
    
    
    // constructor which initially assigned values to the respective private variables
    constructor(string memory name,string memory symbol,uint256 totalSupply) public{
        
        _nameOfToken = name;
        _totalSupply = totalSupply * (10 ** 18);
        _symbol = symbol;
        _decimals = 18;
        _balances[msg.sender] = (totalSupply * (10 ** 18))/2;
        _totalSupply = _totalSupply -  _balances[msg.sender];
        
    }
    
    
    // function to return the total supply of the tokens
    function totalSupply() external view  returns(uint256) {
        return _totalSupply/(10**18);
    }
    
    
    // function to return the name of the tokens
    function nameOfToken() external view returns(string memory){
        return _nameOfToken;
    }
    
    
    // fucntion to return the symbolof the  token
    function symbol() external view returns (string memory) {
        return _symbol;
    }
    
    
    // function to return the decimals used to represent the tokens
    function decimals() external view  returns(uint8) {
        return _decimals;
    }
    
    
    // fucntion to return the balance tokens of the account
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }
    
    
    // function to transfer the money to the appropriate recipient
    function transfer(address recipient, uint256 amount) public returns(bool){
        _transfer(msg.sender,recipient,amount);
        return true;
    }
    
    
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool){
        require(_allowances[sender][msg.sender] >= amount, "ERC20: not allowed for the requested amount");
		_transfer(sender,recipient,amount);
        _approve(sender,msg.sender,_allowances[sender][msg.sender]-amount);
    } 
    
    function approve(address spender, uint256 amount) external returns (bool){
        _approve(msg.sender,spender,amount);
    }
    
    
    // function
    function _approve(address owner, address spender, uint256 amount) internal  {
        require(owner != address(0), "ERC20: cannot approve from the zero address");
        require(spender != address(0), "ERC20: cannot approve to the zero address");

        _allowances[owner][spender] = amount;
       // emit Approval(owner, spender, amount);
    }
    
    // function to view the remaining allowances of a particular spender
    function allowance(address owner, address spender) external view returns (uint256){
        return _allowances[owner][spender];
    }
    

    // internal function which actually make the changes to the balance store
    function _transfer(address sender, address recipient, uint256 amount) internal  {
        require(sender != address(0), "ERC20: cannot transfer from the zero address");
        require(recipient != address(0), "ERC20: cannot transfer to the zero address");
        require(_balances[sender] >= amount, "Insufficient funds");
        
        // deeducted the money from the sender
        _balances[sender] = _balances[sender] - amount;
        
        // credited to the recipient
        _balances[recipient] = _balances[recipient] + amount;
        
        //emit Transfer(sender, recipient, amount);
    }
    
}