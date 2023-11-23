import re

def number_to_text(sentence):
    # Define the number to text mappings
    number_mappings = {
        '0': 'Zero',
        '1': 'One',
        '2': 'Two',
        '3': 'Three',
        '4': 'Four',
        '5': 'Five',
        '6': 'Six',
        '7': 'Seven',
        '8': 'Eight',
        '9': 'Nine'
    }

    # Convert numbers within the sentence to text
    def replace_number(match):
        number = match.group(0)
        text = ' '.join([number_mappings[digit] for digit in number if digit.isdigit()])
        return text

    # Use regular expression to find and replace numbers in the sentence
    pattern = r'\b\d+\b'
    modified_sentence = re.sub(pattern, replace_number, sentence)

    return modified_sentence

  
# t = number_to_text("my number is 9546370762 and account number is 675324678999")
# print(t)


# import re
# from num2words import num2words

# def convert_numbers_to_text(paragraph):
#     # Regular expressions to match different number formats
#     mobile_number_pattern = r"\b(\d{1}){10}\b"
#     aadhaar_number_pattern = r"\b(\d{1}){4}\s(\d{1}){4}\s(\d{1}){4}\b"
#     pan_number_pattern = r"\b([A-Z]{1}){5}(\d{1}){4}([A-Z]{1}){1}\b"
#     amount_pattern = r"\b(\d{1,3}(,\d{3})*)(\.\d{1,2})?\b"
#     account_number_pattern = r"\b(\d{1})+\b"

#     # Convert mobile numbers to text
#     paragraph = re.sub(mobile_number_pattern, lambda match: number_to_text(match.group()), paragraph)

#     # Convert Aadhaar numbers to text
#     paragraph = re.sub(aadhaar_number_pattern, lambda match: number_to_text(match.group()), paragraph)

#     # Convert PAN Card numbers to text
#     paragraph = re.sub(pan_number_pattern, lambda match: number_to_text(match.group()), paragraph)

#     # Convert amount values to text
#     paragraph = re.sub(amount_pattern, lambda match: number_to_text(match.group()), paragraph)

#     # Convert account numbers to text
#     paragraph = re.sub(account_number_pattern, lambda match: number_to_text(match.group()), paragraph)

#     return paragraph


# def number_to_text(number):
#     if number.isnumeric():
#         return num2words(int(number))
#     else:
#         return number

# # Example usage:
# paragraph = "My mobile number is 1234567890. My Aadhaar number is 1234 5678 9012. My PAN Card number is ABCDE1234F. I have Rs 1,234.56 in my account with number 9876543210."
# converted_paragraph = convert_numbers_to_text(paragraph)
# print(converted_paragraph)