def create_ssml_text(text, 
                     dot_break_time, 
                     comma_break_time, 
                     question_break_time, 
                     exclaim_break_time,
                     Rate="medium",  
                     Pitch="medium"
                     ):
  
    Dot=float(dot_break_time)*1000
    Commas=float(comma_break_time)*1000
    Question=float(question_break_time)*1000
    Exclaim=float(exclaim_break_time)*1000
    a1 = int(Dot)
    b1 = int(Dot/2)
    c1 = int(Dot/4)
    a2 = int(Commas)
    b2 = int(Commas/2)
    c2 = int(Commas/4)
    a3 = int(Question)
    b3 = int(Question/2)
    c3 = int(Question/4)
    
   
    break_times = {
            ".": [a1, b1, c1],
            ",": [a2, b2, c2],
            "?": [a3, b3, c3]
        } 
    
    ssml = "<speak>"
    last_stop = 0
    punc_counts = {".": 0, ",": 0, "?": 0, "|": 0}
    for i, c in enumerate(text):
        if c in [".", ",", "?", "|"]:
            idx = punc_counts[c]
            rate = ""
            pitch = ""
            if c == ".":
                rate = Rate
                pitch = Pitch
            elif c == ",":
                rate = Rate
                pitch = Pitch
            elif c == "?":
                rate = Rate
                pitch = Pitch
            elif c == "|":
                rate = rate
                pitch = Pitch
            break_list = break_times.get(c, [0, 0, 0])
            break_time = break_list[min(idx, len(break_list)-1)]
            ssml += f"<prosody rate='{rate}' pitch='{pitch}'>{text[last_stop:i]}</prosody><break time='{break_time}ms'/>"
            last_stop = i+1 if c != " " else i
            punc_counts[c] += 1

    ssml += text[last_stop:] + "</speak>"
    return ssml

# out = create_ssml_text("hello, how are you? thankyou.", "0.5", "0.2", "0.5", "0.3","fast", "medium")

# print(out)