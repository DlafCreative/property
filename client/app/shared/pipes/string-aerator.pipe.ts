import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe allows to put a character for splitting a long string and make it more readable
 * (For the moment, it specifically only put spaces at some places of a WAN id)
 */
@Pipe({name: 'stringAerator'})
export class StringAeratorPipe implements PipeTransform {

    static WAN = 'WAN';
    static PHONE_NUMBER = 'phoneNumber_fr';

    transform(chain: string, type: string = 'WAN'): string {
        let output = null;
        if (chain) {
            chain = chain.replace(/\s+/g, ''); 

            if (type === StringAeratorPipe.WAN) {
                output; 
            }

            switch (type) {
                case StringAeratorPipe.WAN: 
                    return this._transformToWan(chain);
                case StringAeratorPipe.PHONE_NUMBER:
                    return this._transformToPhoneNumber(chain);

            }
        }
        return output;
    }

    _transformToWan(chain: string): string {
        return `${chain.substr(0,4)} ${chain.substr(4,3)} ${chain.substr(7,3)} ${chain.substr(10,3)}`;
    }

    _transformToPhoneNumber(chain: string): string {
        return `${chain.substr(0,2)} ${chain.substr(2,2)} ${chain.substr(4,2)} ${chain.substr(6,2)}`;
    }

}