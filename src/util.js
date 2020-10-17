import React from 'react';
export const addLineBreaks = string => summary(string).split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
    {text}
    <br />
    </React.Fragment>
));
export const summary = string => string.replace(/Uttar Pradesh/g,"UP")
                                    .replace(/Madhya Pradesh/g ,"MP")
                                    .replace(/Andhra Pradesh/g, "AP")
                                    .replace(/West Bengal/g, "WB")
                                    .replace(/Dadra and Nagar Haveli and Daman and Diu/g, "Dadra")
                                    .replace(/Andaman and Nicobar Islands/g, "A&N islands")
                                    .replace(/ and /g," & ");