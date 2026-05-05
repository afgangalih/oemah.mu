import numpy as np

def calculate_av(matrix):
    return np.mean(matrix, axis=0)

def calculate_pda_nda(matrix, av, types):
    rows, cols = matrix.shape
    pda = np.zeros((rows, cols))
    nda = np.zeros((rows, cols))
    
    for j in range(cols):
        for i in range(rows):
            x = matrix[i, j]
            avg = av[j]
            if avg == 0: avg = 0.000001
            if types[j] == "benefit":
                pda[i, j] = max(0, (x - avg) / avg)
                nda[i, j] = max(0, (avg - x) / avg)
            else:
                pda[i, j] = max(0, (avg - x) / avg)
                nda[i, j] = max(0, (x - avg) / avg)
    return pda, nda

def calculate_sp_sn(pda, nda, weights):
    sp = np.dot(pda, weights)
    sn = np.dot(nda, weights)
    return sp, sn

def calculate_nsp_nsn(sp, sn):
    max_sp = np.max(sp)
    max_sn = np.max(sn)
    
    nsp = sp / max_sp if max_sp != 0 else np.zeros_like(sp)
    nsn = 1 - (sn / max_sn) if max_sn != 0 else np.ones_like(sn)
    return nsp, nsn

def calculate_as(nsp, nsn):
    return (nsp + nsn) / 2

def edas_calculate(matrix_list, weights, types, alternatives):
    matrix = np.array(matrix_list)
    av = calculate_av(matrix)
    pda, nda = calculate_pda_nda(matrix, av, types)
    sp, sn = calculate_sp_sn(pda, nda, weights)
    nsp, nsn = calculate_nsp_nsn(sp, sn)
    scores = calculate_as(nsp, nsn)
    
    ranking = []
    for i in range(len(scores)):
        ranking.append({
            "alternative": alternatives[i],
            "as_score": float(scores[i]),
            "nsp": float(nsp[i]),
            "nsn": float(nsn[i]),
            "rank": 0
        })
    
    ranking.sort(key=lambda x: x["as_score"], reverse=True)
    for idx, item in enumerate(ranking):
        item["rank"] = idx + 1
        
    return {
        "av": av.tolist(),
        "pda": pda.tolist(),
        "nda": nda.tolist(),
        "sp": sp.tolist(),
        "sn": sn.tolist(),
        "nsp": nsp.tolist(),
        "nsn": nsn.tolist(),
        "ranking": ranking
    }
