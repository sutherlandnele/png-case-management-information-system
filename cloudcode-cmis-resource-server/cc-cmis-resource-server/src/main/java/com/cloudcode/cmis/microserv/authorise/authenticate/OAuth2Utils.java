/*
 * ************************************************************************
 * Cloudcode PNG Limited Case Management Information System (CMIS) version 1.0.0
 * ************************************************************************
 * Copyright (c) 2021 Cloudcode PNG Limited
 * ************************************************************************
 * CMIS RESTApi - Microservice for Cloudcode PNG Limited CMIS project
 * Support: Sutherland Nele sutherland.nele@cloudcode.com.pg
 * V01.00.00 
 * ************************************************************************
 */
package com.cloudcode.cmis.microserv.authorise.authenticate;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.simple.parser.JSONParser;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
public class OAuth2Utils implements IOAuth2Constants {

    private static final LogWrapper mLogger = LogWrapper.getInstance(OAuth2Utils.class);

    public boolean isValid(String str) {
        return (str != null && str.trim().length() > 0);
    }

    public String encodeCredentials(String username, String password) {
        String cred = username + ":" + password;
        String encodedValue = null;
        byte[] encodedBytes = Base64.encodeBase64(cred.getBytes());
        encodedValue = new String(encodedBytes);
        
        //byte[] decodedBytes = Base64.decodeBase64(encodedBytes);

        return encodedValue;

    }

    public String getAuthorizationHeaderForAccessToken(String accessToken) {
        return BEARER + " " + accessToken;
    }

    public String getBasicAuthorizationHeader(String username,
            String password) {
        return BASIC + " "
                + encodeCredentials(username, password);
    }

    public void parseXMLDoc(Element element, Document doc,
            Map<String, String> oauthResponse) {
        NodeList child = null;
        if (element == null) {
            child = doc.getChildNodes();

        } else {
            child = element.getChildNodes();
        }
        for (int j = 0; j < child.getLength(); j++) {
            if (child.item(j).getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
                org.w3c.dom.Element childElement = (org.w3c.dom.Element) child
                        .item(j);
                if (childElement.hasChildNodes()) {
                    System.out.println(childElement.getTagName() + " : "
                            + childElement.getTextContent());
                    oauthResponse.put(childElement.getTagName(),
                            childElement.getTextContent());
                    parseXMLDoc(childElement, null, oauthResponse);
                }

            }
        }
    }

    public Map handleJsonResponse(HttpResponse response) {
        Map<String, String> oauthLoginResponse = new HashMap<>();
        
        try {
            //response.getStatusLine().getStatusCode();           
            if(response.getEntity() != null){
              oauthLoginResponse = (Map<String, String>) new JSONParser()
                    .parse(EntityUtils.toString(response.getEntity()));              
            }            
            oauthLoginResponse.put(HTTP_RESPONSE_STATUS_CODE, String.valueOf(response.getStatusLine().getStatusCode()));
            
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            mLogger.error(e.getMessage());
            throw new RuntimeException();
        } catch (org.json.simple.parser.ParseException e) {
            // TODO Auto-generated catch block
            mLogger.error(e.getMessage());
            throw new RuntimeException();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            mLogger.error(e.getMessage());
            throw new RuntimeException();
        } catch (RuntimeException e) {
            mLogger.error("Could not parse JSON response");
            throw e;
        }
        //Veracode Fix - Hide Confidential Info
        /*
        for (Map.Entry<String, String> entry : oauthLoginResponse.entrySet()) {
            mLogger.info(String.format("  %s = %s", entry.getKey(), entry.getValue()));
        }
        */
        return oauthLoginResponse;
    }

    public Map handleURLEncodedResponse(HttpResponse response) {
        Map<String, Charset> map = Charset.availableCharsets();
        Map<String, String> oauthResponse = new HashMap<>();
        Set<Map.Entry<String, Charset>> set = map.entrySet();
        Charset charset = null;
        HttpEntity entity = response.getEntity();

        //mLogger.debug("********** Response Receieved **********");    

        for (Map.Entry<String, Charset> entry : set) {
            
           //Veracode Fix - Hide Confidential Info
           //mLogger.info(String.format("  %s = %s", entry.getKey(),entry.getValue()));
            
            if (entry.getKey().equalsIgnoreCase(HTTP.UTF_8)) {
                charset = entry.getValue();
            }
        }

        try {
            List<NameValuePair> list = URLEncodedUtils.parse(
                    EntityUtils.toString(entity), Charset.forName(HTTP.UTF_8));
            for (NameValuePair pair : list) {
                
                //Veracode Fix - Hide Confidential Info
                //mLogger.info(String.format("  %s = %s", pair.getName(),pair.getValue()));
                oauthResponse.put(pair.getName(), pair.getValue());
            }

        } catch (IOException e) {
            // TODO Auto-generated catch block
            mLogger.error(e.getMessage());
            throw new RuntimeException("Could not parse URLEncoded Response");
        }

        return oauthResponse;
    }

    public Map handleXMLResponse(HttpResponse response) {
        Map<String, String> oauthResponse = new HashMap<String, String>();
        try {

            String xmlString = EntityUtils.toString(response.getEntity());
            DocumentBuilderFactory factory = DocumentBuilderFactory
                    .newInstance();
            
            //prevent XXE. Turn off external xml doc parsing
            String FEATURE = "http://apache.org/xml/features/disallow-doctype-decl";
            factory.setFeature(FEATURE, true);
            
            DocumentBuilder db = factory.newDocumentBuilder();
            InputSource inStream = new InputSource();
            inStream.setCharacterStream(new StringReader(xmlString));
            Document doc = db.parse(inStream);
            //mLogger.debug("********** Response Receieved **********");    
            parseXMLDoc(null, doc, oauthResponse);            
        } catch (Exception e) {
            mLogger.error(e.getMessage());
            throw new RuntimeException(
                    "Exception occurred while parsing XML response");
        }
        return oauthResponse;
    }

    public Map handleResponse(HttpResponse response) {
        String contentType = JSON_CONTENT;
        if (response.getEntity() != null && response.getEntity().getContentType() != null) {
            contentType = response.getEntity().getContentType().getValue();
        }
        if (contentType.contains(JSON_CONTENT)) {
            return handleJsonResponse(response);
        } else if (contentType.contains(URL_ENCODED_CONTENT)) {
            return handleURLEncodedResponse(response);
        } else if (contentType.contains(XML_CONTENT)) {
            return handleXMLResponse(response);
        } else {
            // Unsupported Content type
            throw new RuntimeException(
                    "Cannot handle "
                    + contentType
                    + " content type. Supported content types include JSON, XML and URLEncoded");
        }

    }
    public Map<String, String> invalidateToken(OAuth2Parameters oath2Parameters) throws IOException {
        
        Map<String, String> map = null;
        
        HttpPost post = new HttpPost(oath2Parameters.getAuthenticationServer());
        
        List<BasicNameValuePair> parametersBody = new ArrayList<>();

        if (isValid(oath2Parameters.getRefreshToken())) {
            parametersBody.add(new BasicNameValuePair("refresh_token", oath2Parameters.getRefreshToken()));
        }
        if (isValid(oath2Parameters.getClient_secret())) {
            parametersBody.add(new BasicNameValuePair("client_secret", oath2Parameters.getClient_secret()));
        }
        if (isValid(oath2Parameters.getClient_id())) {
            parametersBody.add(new BasicNameValuePair("client_id", oath2Parameters.getClient_id()));
        }
        HttpResponse response = null;
        String accessToken = null;
        
        try (CloseableHttpClient client = HttpClientBuilder.create().build()) {
            
             post.setEntity(new UrlEncodedFormEntity(parametersBody, HTTP.UTF_8));

            response = client.execute(post);
            int code = response.getStatusLine().getStatusCode();
            if (code >= 400) {                
                mLogger.error("Could not invalidate refresh token.");
            }
            
            map = handleResponse(response);
            
        } catch (ClientProtocolException e) {
            // TODO Auto-generated catch block
            mLogger.error(e.getMessage());

        } catch (IOException e) {
            // TODO Auto-generated catch block
            mLogger.error(e.getMessage());
            
        }

        //return accessToken;
        return map;

    }
    
    public Map<String, String> getAccessToken(OAuth2Parameters oath2Parameters) throws IOException {
        
        Map<String, String> map = null;
        
        HttpPost post = new HttpPost(oath2Parameters.getAuthenticationServer());

        List<BasicNameValuePair> parametersBody = new ArrayList<>();
        
        parametersBody.add(new BasicNameValuePair("grant_type", oath2Parameters.getGrantType()));
        parametersBody.add(new BasicNameValuePair("username", oath2Parameters.getUsername()));
        parametersBody.add(new BasicNameValuePair("password", oath2Parameters.getPassword()));

        if (isValid(oath2Parameters.getClient_id())) {
            parametersBody.add(new BasicNameValuePair("client_id", oath2Parameters.getClient_id()));
        }
        if (isValid(oath2Parameters.getClient_secret())) {
            parametersBody.add(new BasicNameValuePair("client_secret", oath2Parameters.getClient_secret()));
        }
        if (isValid(oath2Parameters.getScope())) {
            parametersBody.add(new BasicNameValuePair("scope", oath2Parameters.getScope()));
        }

        //DefaultHttpClient client = new DefaultHttpClient();
        
        HttpResponse response = null;
        String accessToken = null;
        
        try (CloseableHttpClient client = HttpClientBuilder.create().build()) {
            
             post.setEntity(new UrlEncodedFormEntity(parametersBody, HTTP.UTF_8));

            response = client.execute(post);
            int code = response.getStatusLine().getStatusCode();
            if (code >= 400) {
                
                mLogger.error("Authorization server expects Basic authentication");
                // Add Basic Authorization header
                post.addHeader(
                        AUTHORIZATION,
                        getBasicAuthorizationHeader(oath2Parameters.getUsername(),
                                oath2Parameters.getPassword()));

                mLogger.info("Retry with login credentials");
                
                post.releaseConnection();
                response = client.execute(post);
                code = response.getStatusLine().getStatusCode();
                if (code >= 400) {
                    mLogger.error("Authorization server expects client authentication");
                    
                    post.removeHeaders(AUTHORIZATION);
                    post.addHeader(
                            AUTHORIZATION,
                            getBasicAuthorizationHeader(
                                    oath2Parameters.getClient_id(),
                                    oath2Parameters.getClient_secret()));
                    
                    mLogger.info("Retry with client credentials");
                    post.releaseConnection();
                    response = client.execute(post);
                    code = response.getStatusLine().getStatusCode();
                    
                    if (code >= 400) {
                        mLogger.error("Could not retrieve access token for user: "+ oath2Parameters.getUsername());
                    }
                }

            }
            
            map = handleResponse(response);
            accessToken = map.get(ACCESS_TOKEN);
            
        } catch (ClientProtocolException e) {
            // TODO Auto-generated catch block
            mLogger.error(e.getMessage());

        } catch (IOException e) {
            // TODO Auto-generated catch block
            mLogger.error(e.getMessage());
            
        }

        //return accessToken;
        return map;
    }
    
    
}
