const resultant = (x=0, y=0, z=0) => {
    let xy = x*x + y*y;
    xy = Math.sqrt(xy);
    
    let yz = xy*xy + z*z;
    yz = Math.sqrt(yz);
    
    return yz;
};

module.exports.resultant = resultant;