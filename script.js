window.onload = function () {


    //GET DOM ELEMENTS
    const generatePasswordButton = document.querySelector('button')
    const passwordSpan = document.getElementById('span-password')
    const strentghSpan = document.getElementById('current-strength')
    const rangeInput = document.querySelector('input[type=range]')


    //MAIN FUNCITONS
    const setRangeValueInDom = evt => document.getElementById('current-length').innerText = evt.target.value


    function generatePassword() {

        const arrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz'
        const upperAlphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
        const arraySymbols = ["&", "!", "#", "*", "?", "$", "%", "@"]

        const includesUppercase = document.getElementById('uppercase').checked
        const includesLowercase = document.getElementById('lowercase').checked
        const includesNumbers = document.getElementById('numbers').checked
        const includesSymbols = document.getElementById('symbols').checked

        let password = ''
        const totalCaracteres = Number(rangeInput.value)

        while (password.length !== totalCaracteres) {

            if (includesUppercase) {

                const arrayIdexes = upperAlphabet.length - 1
                const randomIndex = Math.round(Math.random() * arrayIdexes);

                password += upperAlphabet[randomIndex];

                if (password.length === totalCaracteres) break //had to do these second verification else a infinite loop would happen sometime
            }

            if (includesLowercase) {

                const arrayIdexes = lowerAlphabet.length - 1
                const randomIndex = Math.round(Math.random() * arrayIdexes);

                password += lowerAlphabet[randomIndex];

                if (password.length === totalCaracteres) break
            }

            if (includesNumbers) {

                const arrayIdexes = arrayNumbers.length - 1
                const randomIndex = Math.round(Math.random() * arrayIdexes);

                password += arrayNumbers[randomIndex];

                if (password.length === totalCaracteres) break
            }

            if (includesSymbols) {

                const arrayIdexes = arraySymbols.length - 1
                const randomIndex = Math.round(Math.random() * arrayIdexes);

                password += arraySymbols[randomIndex];

                if (password.length === totalCaracteres) break
            }
        } //end while


        password = shufflePassword(password);
        setGeneratedPassword(password)
        setPasswordStrength(password)
    }//end function


    function setPasswordStrength(password) {
        const orangeBg = 'rgb(248 205 102)'

        if (password.length <= 7) {

            bar1.style.backgroundColor = orangeBg // im using the element id to manipulate itself
            bar1.style.borderColor = orangeBg
            bar2.style.backgroundColor = 'inherit'
            bar2.style.borderColor = 'inherit'
            bar3.style.backgroundColor = 'inherit'
            bar3.style.borderColor = 'inherit'
            bar4.style.backgroundColor = 'inherit'
            bar4.style.borderColor = 'inherit'

            strentghSpan.textContent = 'WEAK'


        } else {

            if (password.length <= 10) {

                bar1.style.backgroundColor = orangeBg
                bar1.style.borderColor = orangeBg
                bar2.style.backgroundColor = orangeBg
                bar2.style.borderColor = orangeBg
                bar3.style.backgroundColor = orangeBg
                bar3.style.borderColor = orangeBg
                bar4.style.backgroundColor = 'inherit'
                bar4.style.borderColor = 'inherit'

                strentghSpan.textContent = 'MEDIUM'


            } else {

                bar1.style.backgroundColor = orangeBg
                bar1.style.borderColor = orangeBg
                bar2.style.backgroundColor = orangeBg
                bar2.style.borderColor = orangeBg
                bar3.style.backgroundColor = orangeBg
                bar3.style.borderColor = orangeBg
                bar4.style.backgroundColor = orangeBg
                bar4.style.borderColor = orangeBg

                strentghSpan.textContent = 'STRONG'
            }
        } // end first else
    }// end function







    //AUXILIAR FUNCTIONS
    const setGeneratedPassword = password => passwordSpan.textContent = password
    const shufflePassword = pw => Array.from(pw).sort((a, b) => Math.random() - 0.5).join('')
    const copyPassword = () => navigator.clipboard.writeText(passwordSpan.textContent)



    //ADDING EVENTS
    rangeInput.addEventListener('input', setRangeValueInDom)
    generatePasswordButton.addEventListener('click', generatePassword)
    document.getElementById('icon-copy').addEventListener('click', copyPassword)
    document.getElementById('icon-copy').addEventListener('click', evt =>{
        copyText.style.opacity = 1
        setTimeout(() => copyText.style.opacity = 0 , 1500)
    })


    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {//add click event at all checboxes
        checkbox.addEventListener('click', () => {


            //put all checkboxes into an array
            const arrayCheckboxes = []
            document.querySelectorAll(('input[type=checkbox]')).forEach(button => arrayCheckboxes.push(button))

            //if some checkbox is checked, unable the generate password button, else, disabled
            arrayCheckboxes.some(checkbox => checkbox.checked) ? generatePasswordButton.removeAttribute('disabled') : generatePasswordButton.setAttribute('disabled', '')

        })
    })








    //INPUT RANGE SETTINGS
    function handleInputChange(evt) {

        let target = evt.target

        if (target.type !== 'range') target = document.getElementById('range')
            
        const min = target.min
        const max = target.max
        const val = target.value

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    }

    document.querySelector('input[type="range"]').addEventListener('input', handleInputChange)
    

   

}

