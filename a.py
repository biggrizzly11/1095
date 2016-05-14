with open('fdf.txt') as fp:
    count = 0
    print "var data = {"
    for line in fp:
        strs=line.split(':')
    	if strs[0] == 'FieldName':
        	print "'"+str(strs[1]).strip()+"': '',"
    print "}"